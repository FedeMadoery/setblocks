import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';


import Card from './Card';
import Flex from './Flex';
import Text from './Text';

class DayBlock extends React.Component {

    renderTinySetBlocks = (setBlocks, day) => {
        const blockDay = moment(day).format('YYYY-MM-DD')
        const setBlocksByDate = _.groupBy(setBlocks, 'date')
        let setBlocksToRender = setBlocksByDate[blockDay] || [];
        setBlocksToRender = _.orderBy(setBlocksToRender, 'blockTime') // Order by blockTime to have all the tinyBlock ordered
        if (setBlocksToRender.length > 0) {
            return setBlocksToRender.map(setBlock => (
                <Card
                    key={setBlock.id}
                    height='8px'
                    width='8px'
                    borderBottom={setBlock.blockFraction === 1.0 ? '4px #F93B6A solid' : (setBlock.blockFraction === 0.5 ? '4px #F93B6A solid' : '')}
                    borderTop={setBlock.blockFraction === 1.0 ? '4px #F93B6A solid' : (setBlock.blockFraction === -0.5 ? '4px #F93B6A solid' : '')}
                    bg='lightGrey'
                    my='0.3rem'
                    mr='0.3rem'
                >
                </Card>
            ))
        } else {
            return <Card height='8px' width='5px' bg='none' my='0.3rem' mr='0.3rem' /> // To prevent the sidebar grows slightly in width when render the tinySetBlocks
        }
    }

    render() {
        const { day, selected, onClick, fetchingData, currentWeeklySetblocks } = this.props

        return (
            <Flex
                column
                center
                className='DayBlock'
                mx='0.5rem'
            >
                <Card
                    width='100%'
                    bg='white'
                    borderLeft={selected ? '2px solid red' : '2px solid white'}
                    depth={9}
                    mx='0.5rem'
                    onClick={() => onClick(day)}
                >
                    <Flex row center>
                        <Flex column mx='auto'>
                            { // If you are waiting for the API to respond, it does not render
                                this.renderTinySetBlocks(currentWeeklySetblocks, day, fetchingData)
                            }
                        </Flex>
                        <Flex column mr='auto'>
                            <Text align='center' mb='0rem' color={selected ? 'red' : 'textSecondary'}>
                                {day.getDate()}
                            </Text>
                            <Text align='center' mt='0rem' color={selected ? 'red' : 'textSecondary'}>
                                {day.toDateString().slice(0, 3)}
                            </Text>
                        </Flex>
                    </Flex>
                </Card>
            </Flex>
        );
    }
}

const mapStateToProps = ({ environment }) => {
    return {
        ...environment
    };
};

const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(DayBlock)