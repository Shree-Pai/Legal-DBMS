import mysql.connector as mc
from mysql.connector import Error
from dotenv import load_dotenv
import os
passw = os.getenv("PASSWORD")

def log_lawyer_operation(cursor, connection, operation_type, lawyer_id, description=""):
    try:
        cursor.execute("""
            INSERT INTO OperationsLog (TableName, RecordID, OperationType, Description)
            VALUES (%s, %s, %s, %s);
        """, ('Lawyers', lawyer_id, operation_type, description))
        connection.commit()
    except Exception as e:
        print(f"Error logging lawyer operation: {e}")
