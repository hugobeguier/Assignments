
import { useState } from "react";
import "../App.css";

function FeedbackForm ({ options }) {
    const [isOpen, setIsOpen] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [comment, setComment] = useState("");
    const [previousComments, setPreviousComments] = useState([]);

    const toggleDropdown = () => {
        setIsOpen(true);
    }

    const handleChange = (option) => {
        setFeedback(option);
        setIsOpen(false)
    }

    const addComments = () => {
        if(!feedback || !comment) {
            alert("Please select feedback and add a comment before submitting");
            return;
        }

        setPreviousComments((prev) => [
            ...prev, 
            {feedback,comment}
        ]);

        setFeedback("Grade Us");
        setComment("");
    }

    return (
        <div className="dropdown-container">
            <div>
                <div className="feedback-field" onClick={toggleDropdown}>
                    {!feedback ? "Grade us" : feedback}
                </div>
                {isOpen && (
                    <ul className="dropdown-options">
                        {options.map((option,index) => ( //Looping through an array
                            <li className="dropdown-option" key={index} value={option} onClick={ () => handleChange(option)}> {/*Here we are adding an <li> element for each item in the array when we click the feedback-field and if we click on one we enter handleChange*/} 
                                  {option}  
                            </li>
                        ))}
                    </ul>
                )}
            </div>
           
            <div className="comment-container">
                <textarea placeholder="Write your comment here: " className="comment" value={comment} onChange={e => setComment(e.target.value)}/>
            </div>
            <div>
                <button className= "submit-feedback-btn" onClick={() => addComments()}>Submit</button>
            </div>
            <h3>Previous Comments: </h3>
            <div className="previous-feed">
                <ul className="previous-comments">
                    {previousComments.map((item,index) => (
                        <li 
                            className="previous-comment-list" 
                            key={index} 
                            onClick={() => alert(`Feedback:  ${item.feedback}\n Comment: ${item.comment}`)}
                        >
                            <strong>{item.feedback}</strong>{item.comment}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default FeedbackForm; 