const { fetchData } = require('./http')

function checkHealth(person) {
    let result;

    if (person.health > 50) {
        result = "healthy";
    } else if (person.health > 15 && person.health < 50) {
        result = "wounded";
    } else if (person.health < 15 && person.health > 0) {
        result = "critical";
    }
    
    return result
}

function sortPersons(persons) {
    return persons.sort((a, b) => b.health - a.health)
}

function getLevel(userId) {
    const response = fetchData(`https://server/user/${userId}`);
    
    // TODO: логика обработки
    if (response.status === 'ok') {
       return `Ваш текущий уровень: ${response.level}`; 
    }
    
    return `Информация об уровне временно недоступна`;
  }

module.exports = {
    checkHealth,
    sortPersons,
    getLevel
};
