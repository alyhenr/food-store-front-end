import PropTypes from "prop-types";


const LargeButton = (props) => {
    const { text, customstyles, isloading = false } = props;
    return (
        <button
            disabled={isloading}
            {...props}
            className={`w-80 h-14 text-lg cursor-pointer font-bold text-center rounded-2xl bg-[#aaa] hover:opacity-[95%] hover:bg-[#125c13] ${customstyles}`}>
            {text}
        </button>
    )
}

LargeButton.propTypes = {
    text: PropTypes.string,
    customstyles: PropTypes.string,
    isloading: PropTypes.bool,
}

export default LargeButton