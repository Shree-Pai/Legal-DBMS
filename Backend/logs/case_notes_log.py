def log_case_notes_operation(cursor, connection, operation_type, note_id, description=""):
    try:
        cursor.execute("""
            INSERT INTO OperationsLog (TableName, RecordID, OperationType, Description)
            VALUES (%s, %s, %s, %s);
        """, ('CaseNotes', note_id, operation_type, description))
        connection.commit()
    except Exception as e:
        print(f"Error logging case notes operation: {e}")
