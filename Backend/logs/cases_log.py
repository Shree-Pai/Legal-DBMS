def log_case_operation(cursor, connection, operation_type, case_id, description=""):
    try:
        cursor.execute("""
            INSERT INTO OperationsLog (TableName, RecordID, OperationType, Description)
            VALUES (%s, %s, %s, %s);
        """, ('Cases', case_id, operation_type, description))
        connection.commit()
    except Exception as e:
        print(f"Error logging case operation: {e}")
