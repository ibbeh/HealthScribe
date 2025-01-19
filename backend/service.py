import sqlite3
import os
from flask import Flask, request, jsonify

app = Flask(__name__)

# Function to connect to the SQLite database
def get_db_connection():
    db_path = os.path.join(os.getcwd(), 'database', 'doctor_notes.db')
    print(f"Connecting to database at: {db_path}")  # Debugging to verify the correct file
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row  # Enable dictionary-like access for rows
    return conn

# Helper function to check if a patient exists using their health card
def patient_exists(health_card):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM patients WHERE health_card = ?", (health_card,))
    patient = cursor.fetchone()
    conn.close()
    return patient  # Return the row or None

# Add a new patient and appointment
@app.route('/save', methods=['POST'])
def save_appointment():
    try:
        data = request.get_json()
        first_name = data['first_name']
        last_name = data['last_name']
        age = data['age']
        health_card = data['health_card']
        doctor_id = data['doctor_id']
        appointment_date = data['appointment_date']
        report = data.get('report', '')  # Optional field

        conn = get_db_connection()
        cursor = conn.cursor()

        # Check if the patient exists by health card
        patient = patient_exists(health_card)
        if patient is None:
            # Add the new patient
            cursor.execute(
                "INSERT INTO patients (first_name, last_name, age, health_card) VALUES (?, ?, ?, ?)", 
                (first_name, last_name, age, health_card)
            )
            conn.commit()
            patient_id = cursor.lastrowid  # Get the ID of the new patient
            print(f"Patient created with ID: {patient_id}")
        else:
            patient_id = patient['patient_id']  # Get the existing patient ID

        # Add the appointment
        cursor.execute(
            "INSERT INTO appointments (patient_id, doctor_id, appointment_date, report) VALUES (?, ?, ?, ?)",
            (patient_id, doctor_id, appointment_date, report)
        )
        conn.commit()
        conn.close()

        return jsonify({"message": "Appointment and patient added successfully if necessary"}), 201

    except Exception as e:
        # Handle errors gracefully
        return jsonify({"error": str(e)}), 500

# View all appointments
@app.route('/appointments', methods=['GET'])
def view_appointments():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Query to get all appointments
        cursor.execute('''
            SELECT appointments.appointment_id, patients.first_name, patients.last_name, patients.health_card, 
            appointments.appointment_date, appointments.report, doctors.first_name AS doctor_first_name, 
            doctors.last_name AS doctor_last_name
            FROM appointments
            JOIN patients ON appointments.patient_id = patients.patient_id
            JOIN doctors ON appointments.doctor_id = doctors.doctor_id
        ''')

        appointments = cursor.fetchall()
        conn.close()

        # Format appointments into a list of dictionaries
        appointments_list = []
        for appointment in appointments:
            appointment_data = {
                'appointment_id': appointment[0],
                'patient_name': f"{appointment[1]} {appointment[2]}",
                'patient_health_card': appointment[3],
                'appointment_date': appointment[4],
                'report': appointment[5],
                'doctor_name': f"{appointment[6]} {appointment[7]}"
            }
            appointments_list.append(appointment_data)

        # Return the appointments as a JSON response
        return jsonify(appointments_list)

    except Exception as e:
        # Handle errors gracefully
        return jsonify({"error": str(e)}), 500

# ----------------------------------------------
# Future functionality should be added below here
# For example, another route for deleting appointments
# or updating patient records could be implemented here
# ----------------------------------------------

if __name__ == '__main__':
    app.run(debug=True)

