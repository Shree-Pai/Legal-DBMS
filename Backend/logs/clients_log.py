def log_client_operation(cursor, connection, operation_type, client_id, description=""):
    try:
        cursor.execute("""
            INSERT INTO OperationsLog (TableName, RecordID, OperationType, Description)
            VALUES (%s, %s, %s, %s);
        """, ('Clients', client_id, operation_type, description))
        connection.commit()
    except Exception as e:
        print(f"Error logging client operation: {e}")
