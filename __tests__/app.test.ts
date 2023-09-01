import axios from 'axios';

describe('API Tests', () => {
  test('GET /', async () => {
    const response = await axios.get('http://localhost:8080/');
    expect(response.status).toBe(200);
  });
  test('GET /ping', async () => {
    const response = await axios.get('http://localhost:8080/ping');
    expect(response.status).toBe(200);
  });
});
