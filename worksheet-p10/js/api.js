// js/api.js
const URL = 'https://jsonplaceholder.typicode.com/posts';

export async function fetchNews() {
  try {
    const response = await fetch(URL);

    console.log(
      'status:', response.status,
      'ok:', response.ok
    );

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error('Gagal mengambil data:', error.message);
    throw error;
  }
}