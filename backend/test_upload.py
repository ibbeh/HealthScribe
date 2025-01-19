import requests

# URL of the Flask API
url = "http://127.0.0.1:5000/api/upload"

# Path to the file
file_path = r"C:\School_Files_Folder\Fall_2024_IE\audio-video-processing\LecChurro\LecChurro\data\audio\necessity_of_complex_numbers.mp3"

# Upload the file
with open(file_path, "rb") as file:
    response = requests.post(url, files={"file": file})

# Print the response
if response.status_code == 200:
    print("Transcription Response:", response.json())
else:
    print(f"Error {response.status_code}: {response.text}")
