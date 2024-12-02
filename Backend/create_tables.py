import mysql.connector as mc
from db_config import get_db_connection

def create_database_if_not_exists():
    try:
        # Establish a connection to MySQL server without selecting a specific database
        connection = mc.connect(
            host="localhost",
            user="root",
            password="your_password_here"  # Replace with your MySQL password
        )
        cursor = connection.cursor()

        # Check if the database exists
        cursor.execute("SHOW DATABASES LIKE 'legal_case_management';")
        result = cursor.fetchone()

        # If database doesn't exist, create it
        if not result:
            print("Database 'legal_case_management' does not exist. Creating it...")
            cursor.execute("CREATE DATABASE legal_case_management;")
            print("Database 'legal_case_management' created successfully.")
        else:
            print("Database 'legal_case_management' already exists.")

        # Commit changes and close the connection
        connection.commit()
        cursor.close()
        connection.close()
    except Exception as e:
        print(f"Error creating database: {e}")

def create_tables():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()
        try:
            # Drop tables if they exist to avoid issues with partial creation
            cursor.execute("DROP TABLE IF EXISTS OperationsLog, CaseNotes, Cases, Clients, Lawyers;")
            print("Old tables dropped successfully (if they existed).")
            
            # Create Lawyers table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS Lawyers (
                    LawyerID INT AUTO_INCREMENT PRIMARY KEY,
                    Name VARCHAR(100) NOT NULL,
                    Specialization VARCHAR(50),
                    Email VARCHAR(100) UNIQUE NOT NULL,
                    ContactNumber VARCHAR(20) UNIQUE NOT NULL,
                    Experience INT NOT NULL
                );
            """)
            print("Lawyers table created successfully.")

            # Create Clients table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS Clients (
                    ClientID INT AUTO_INCREMENT PRIMARY KEY,
                    Name VARCHAR(100) NOT NULL,
                    Email VARCHAR(100) UNIQUE NOT NULL,
                    ContactNumber VARCHAR(20) UNIQUE NOT NULL
                );
            """)
            print("Clients table created successfully.")

            # Create Cases table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS Cases (
                    CaseID INT AUTO_INCREMENT PRIMARY KEY,
                    CaseType VARCHAR(50) NOT NULL,
                    LawyerID INT NOT NULL,
                    ClientID INT NOT NULL,
                    Status VARCHAR(50) DEFAULT 'Open',
                    FOREIGN KEY (LawyerID) REFERENCES Lawyers(LawyerID),
                    FOREIGN KEY (ClientID) REFERENCES Clients(ClientID)
                );
            """)
            print("Cases table created successfully.")

            # Create CaseNotes table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS CaseNotes (
                    NoteID INT AUTO_INCREMENT PRIMARY KEY,
                    CaseID INT NOT NULL,
                    NoteText TEXT NOT NULL,
                    FOREIGN KEY (CaseID) REFERENCES Cases(CaseID)
                );
            """)
            print("CaseNotes table created successfully.")

            # Create OperationsLog table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS OperationsLog (
                    LogID INT AUTO_INCREMENT PRIMARY KEY,
                    TableName VARCHAR(50) NOT NULL,
                    RecordID INT NOT NULL,
                    OperationType VARCHAR(50) NOT NULL,
                    Description TEXT,
                    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            """)
            print("OperationsLog table created successfully.")

            connection.commit()
            print("All tables created and changes committed successfully.")

        except Exception as e:
            print(f"Error creating tables: {e}")
        finally:
            cursor.close()
            connection.close()
    else:
        print("Failed to connect to the database.")

if __name__ == "__main__":
    create_database_if_not_exists()  # Ensure database is created before proceeding
    create_tables()  # Ensure tables are created after the database is ready
