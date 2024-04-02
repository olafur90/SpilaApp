import React, { useState } from 'react';

export const PlayerSection = ({ index, player, setPlayers }) => {
    const [typeOfScore, setTypeOfScore] = useState([
        { canEdit: true, type: 'Ásar', score: 0, maxScore: 6 },
        { canEdit: true, type: 'Tvistar', score: 0, maxScore: 12 },
        { canEdit: true, type: 'Þristar', score: 0, maxScore: 18 },
        { canEdit: true, type: 'Fjarkar', score: 0, maxScore: 24 },
        { canEdit: true, type: 'Fimmur', score: 0, maxScore: 30 },
        { canEdit: true, type: 'Sexur', score: 0, maxScore: 36 },
        { canEdit: true, type: 'Summa', score: 0, maxScore:  126},
        { canEdit: true, type: 'Bónus 50 stig f. 63 eða meira', score: 0, maxScore: 50 },
        { canEdit: true, type: 'Þrír eins', score: 0, maxScore: 18 },
        { canEdit: true, type: 'Fjórir eins', score: 0, maxScore: 24 },
        { canEdit: true, type: 'Fullt hús', score: 0, maxScore: 36 },
        { canEdit: true, type: 'Lág röð', score: 0, maxScore: 15 },
        { canEdit: true, type: 'Há röð', score: 0, maxScore: 20 },
        { canEdit: true, type: 'Stór röð', score: 0, maxScore: 21 },
        { canEdit: true, type: 'Áhætta', score: 0, maxScore: 36 },
        { canEdit: true, type: 'Yatzy, 100 auka stig', score: 0, maxScore: 136 },
        { canEdit: true, type: 'Heildar stig', score: 0, maxScore: 482 },
    ]);

    const handleScoreChange = () => {
        const totalScore = typeOfScore.reduce((acc, curr) => acc + curr.score, 0);

    }

    // Update the total score when typeOfScore changes
    useEffect(() => {
        handleScoreChange();
    }, [typeOfScore]);

    return (
        <View>
            <PlayerInfo />
            { typeOfScore.map((scoreType) => <TypeItem scoreType={scoreType} />) }
            { /* TODO: */}
        </View>
    )
}

export const TypeItem = ({ scoreType, handleScoreChange }) => {
    return (
        <View style={styles.typeItem}>
            <Text>{ scoreType.type }</Text>
            { scoreType.canEdit ? 
                ( 
                    <>
                        <TextInput onChangeText={handleScoreChange} /> 
                        <Button title="Skrá" />
                    </>
                ) 
                : ( <Text>{ scoreType.score }</Text> )
            }
        </View>
    )
}

export const PlayerInfo = () => {
    return (
        <View>
            { /* TODO: Component for each player */}
        </View>
    )
}

const styles = StyleSheet.create({
    typeItem: {
        flexDirection: 'row',
    }
});