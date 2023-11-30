import PropTypes from "prop-types";


const LargeButton = (props) => {
    const { text, customstyles } = props;
    return (
        <button
            {...props}
            className={`${customstyles} w-80 h-14 text-lg font-bold text-center text-white rounded-2xl bg-[#aaa] hover:opacity-[95%] hover:bg-[#125c13]`}>
            {text}
        </button>
    )
}

LargeButton.propTypes = {
    text: PropTypes.string,
    customstyles: PropTypes.string,
}

export default LargeButton