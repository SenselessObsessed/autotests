import { checkHealth,sortPersons, getLevel } from '../index';
import fetchData from '../http';

jest.mock('../http.js');

beforeEach(() => {
    jest.resetAllMocks();
});

test('Should check health and return string', () =>{

    let expected = checkHealth({name: 'Маг', health: 90})
    let recived = 'healthy'

    expect(expected).toBe(recived)

    expected = checkHealth({name: 'Маг', health: 85})

    expect(expected).toBe(recived)

    expected = checkHealth({name: 'Маг', health: 35})
    recived = 'wounded'

    expect(expected).toBe(recived)

    expected = checkHealth({name: 'Маг', health: 10})
    recived = 'critical'

    expect(expected).toBe(recived)

    expected = checkHealth({name: 'Маг', health: -5})

    expect(expected).toBeUndefined();
});

test ('Should sorted massive of persons', () => {
    let persons = [
        {name: 'мечник', health: 10},
        {name: 'маг', health: 100},
        {name: 'лучник', health: 80},
    ];

    let expected = sortPersons(persons)
    let recived = [
        {name: 'маг', health: 100},
        {name: 'лучник', health: 80},
        {name: 'мечник', health: 10},
    ];

    expect(expected).toEqual(recived)
});

test('Should test http request MOCK', () => {

    fetchData.mockReturnValue({
        status: 'ok',
        level: 'Krasava'
    })

    getLevel(2);

    expect(fetchData).toHaveBeenCalledWith('https://server/user/2');
    expect(getLevel(2)).toBe('Ваш текущий уровень: Krasava')

    fetchData.mockReturnValue({
        status: '404',
        level: 'Krasava'
    })

    expect(getLevel(2)).toBe('Информация об уровне временно недоступна')
})


