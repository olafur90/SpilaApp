// This file should contain all functions for database manipulation for the Scrabble game
export const updateScore = async (db, gameResults) => {
    const insertQuery = `
    Update Scrabble
       SET lastWinner = ?, name = ?, phoneNumber = ?
       VALUES (?, ?)
     `;
    const values = [gameResults.winner, gameResults.winnerScore, gameResults.loserScore];
    try {
        return db.executeSql(insertQuery, values);
    } catch (error) {
        console.error(error);
        throw Error('Failed to add contact');
    }
};

