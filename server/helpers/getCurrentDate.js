const getCurrentDate = () => {
    const currentDate = new Date();
    
    if (typeof currentDate === 'object' && currentDate !== null && 'toLocaleDateString' in currentDate) {
        return currentDate.toLocaleDateString(); 
    }
}

module.exports = getCurrentDate