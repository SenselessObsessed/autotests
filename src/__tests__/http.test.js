import fetchData from '../http';

test('Should be throw error of request', () => {

    const recived = () => fetchData('qiqiwejqiqwejiqw');

    expect(recived).toThrow('Mock this!');
})