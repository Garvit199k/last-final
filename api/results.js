export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, wpm, accuracy } = req.body;

        // Here you would typically save the results to a database
        // For this example, we'll just return the results as a response
        const result = {
            username,
            wpm,
            accuracy,
            timestamp: new Date().toISOString(),
        };

        res.status(200).json(result);
    } else if (req.method === 'GET') {
        // Here you would typically retrieve results from a database
        // For this example, we'll return a mock result
        const mockResults = [
            { username: 'User1', wpm: 75, accuracy: 95, timestamp: '2023-10-01T12:00:00Z' },
            { username: 'User2', wpm: 85, accuracy: 90, timestamp: '2023-10-02T12:00:00Z' },
        ];

        res.status(200).json(mockResults);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}