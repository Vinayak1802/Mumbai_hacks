from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
import requests
import os
from datetime import timedelta

app = Flask(__name__)
CORS(app)

# Setup JWT
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this to a secure secret key
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
jwt = JWTManager(app)

SUPABASE_URL = 'YOUR_SUPABASE_URL'
SUPABASE_SERVICE_KEY = 'YOUR_SUPABASE_SERVICE_KEY'

@app.route('/auth/token', methods=['POST'])
def get_token():
    supabase_token = request.json.get('supabase_token')
    
    if not supabase_token:
        return jsonify({'error': 'No token provided'}), 400
    
    # Verify the Supabase token
    headers = {
        'Authorization': f'Bearer {SUPABASE_SERVICE_KEY}',
        'apikey': SUPABASE_SERVICE_KEY
    }
    
    response = requests.get(
        f'{SUPABASE_URL}/auth/v1/user',
        headers={
            **headers,
            'Authorization': f'Bearer {supabase_token}'
        }
    )
    
    if response.status_code != 200:
        return jsonify({'error': 'Invalid token'}), 401
    
    user_data = response.json()
    
    # Create JWT token
    access_token = create_access_token(identity=user_data['id'])
    
    return jsonify({
        'token': access_token,
        'user': user_data
    })

if __name__ == '__main__':
    app.run(debug=True)