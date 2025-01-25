const API_URL = 'http://localhost:3000/api';

export const api = {
	async register(email: string, password: string) {
		const response = await fetch(`${API_URL}/auth/register`, {
			method: 'POST',
			headers: {'Content-Tpe': 'application/json'},
			credentials: 'include',
			body: JSON.stringify({ email, password})
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message);
		}
		return response.json();
	},

	async login(email: string, password: string) {
		const response = await fetch(`${API_URL}/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			credentials: 'include',
			body: JSON.stringify({ email, password})
		});
		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message);
		}
		return response.json();
	},

	async logout() {
		const response = await fetch(`${API_URL}/auth/logout`, {
			method: 'POST',
			credentials: 'include'
		});
		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message);
		}
		return response.json();
	},

	async getComments(ContentType: string, contentId: string) {
		const response = await fetch(
			`${API_URL}/comments/${ContentType}/${contentId}`,
			{ credentials: 'include' }
		);
		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message);
		}
		return response.json();
	},

	async addComment(ContentType: string, contentId: string, comment: string) {
		const response = await fetch(`${API_URL}/comments`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({ ContentType, contentId, comment})
		});
		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message);
		}
		return response.json();
	}
};