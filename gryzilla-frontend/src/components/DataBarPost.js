export default function DataBar({likes, nick, date}){


    return (
        <div className="data-bar">

            <div className="likes-box">
                <div className="plus-sign">+</div>
                <span style={{color: "green"}}>{likes}</span>
            </div>

            <div className="d-flex flex-column">
                <span className="user-nick">{nick}</span>
                <span className="label">Użytkownik</span>
            </div>

            <div className="d-flex flex-column">
                <span>{date}</span>
                <span className="label">Data powstania</span>
            </div>
            
            
        </div>
    );

}