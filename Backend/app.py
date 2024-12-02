import os
import mysql.connector as mc
from dotenv import load_dotenv
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from db_config import get_db_connection
from logs.lawyers_log import log_lawyer_operation
from logs.clients_log import log_client_operation
from logs.cases_log import log_case_operation
from create_tables import create_tables

# Load environment variables
load_dotenv()
passw = os.getenv("PASSWORD")

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Database connection function
def get_db_connection():
    try:
        return mc.connect(
            host="localhost",
            database="legal_case_management",
            user="root",
            passwd=passw,
        )
    except mc.Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

# Ensure tables are created before the app starts
create_tables()

@app.route('/favicon.ico')
def favicon():
    return send_from_directory('static', 'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/')
def home():
    return 'Welcome to the Legal Case Management System'

@app.route('/predict', methods=['POST'])
def predict_case():
    try:
        data = request.json
        prediction = rule_based_prediction(data)  # Ensure rule_based_prediction is defined
        return jsonify({'prediction': prediction})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/add_lawyer', methods=['POST'])
def add_lawyer():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()
        lawyer_data = request.json
        try:
            cursor.execute("""
                INSERT INTO Lawyers (Name, Specialization, Email, ContactNumber, Experience)
                VALUES (%s, %s, %s, %s, %s);
            """, (
                lawyer_data['name'],
                lawyer_data['specialization'],
                lawyer_data['email'],
                lawyer_data['contact_number'],
                lawyer_data['experience'],
            ))
            connection.commit()
            lawyer_id = cursor.lastrowid
            log_lawyer_operation(cursor, connection, 'Add', lawyer_id, 'Added new lawyer')
            return jsonify({"message": "Lawyer added successfully", "lawyer_id": lawyer_id})
        except mc.Error as e:
            if e.errno == 1062:  # MySQL error code for duplicate entry
                return jsonify({"error": "Duplicate entry. This lawyer already exists."}), 409
            return jsonify({"error": str(e)}), 500
        finally:
            cursor.close()
            connection.close()
    return jsonify({"error": "Database connection failed"}), 500


@app.route('/lawyers', methods=['GET'])
def get_lawyers():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor(dictionary=True)  # Use dictionary=True to get results as dict
        try:
            cursor.execute("SELECT * FROM Lawyers")
            lawyers = cursor.fetchall()
            return jsonify({"lawyers": lawyers})
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        finally:
            cursor.close()
            connection.close()
    return jsonify({"error": "Database connection failed"}), 500

if __name__ == '__main__':
    app.run(debug=True)
