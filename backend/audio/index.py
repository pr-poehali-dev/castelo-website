import json

def handler(event, context):
    '''
    Business: Serves audio files and handles audio-related requests
    Args: event - dict with httpMethod, queryStringParameters
          context - object with attributes: request_id, function_name
    Returns: HTTP response dict with audio URL or audio data
    '''
    method = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'GET':
        # Возвращаем URL для аудио файла (гимн Люфтваффе)
        # Используем публичный домен аудио файл
        audio_data = {
            'audio_url': 'https://archive.org/download/DerFuehrerTonaufnahmenSammelband/06%20-%20Das%20Deutschlandlied.mp3',
            'title': 'Audio Track',
            'duration': 120,  # примерная длительность в секундах
            'type': 'mp3'
        }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps(audio_data)
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'})
    }