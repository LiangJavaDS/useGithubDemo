import { useRef } from 'react';
import { UpSquareOutlined } from '@ant-design/icons';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};
export const ActionItem = ({ id, text, index, moveCard }) => {
    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        // accept: ItemTypes.CARD,
        accept: 'div',
        collect(monitor) {
            console.log('7878monitor.getHandlerId()', monitor.getHandlerId());
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            // console.log('7878dragIndex', dragIndex);
            const hoverIndex = index;
            // console.log('7878hoverIndex', hoverIndex);
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%

            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: 'div',
        item: () => {
            return { id, index };
        },
        collect: (monitor) => {
            // console.log('7878monitor.isDragging()', monitor.isDragging());
            return {
                isDragging: monitor.isDragging(),
            }
        },
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
    return (
        <div data-handler-id={handlerId}>
            <UpSquareOutlined ref={ref} style={{ ...style, opacity }} />{text}
        </div>
    );
};
