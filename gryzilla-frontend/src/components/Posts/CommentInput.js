export default function CommentInput() {
    return (
        <div className="comment-input-wrapper post-wrapper">
            <div className="comments-input-widget-box">Widget box</div>
            <textarea class="form-control comment-input" placeholder="Napisz nowy komentarz..." id="exampleFormControlTextarea1" rows="5"></textarea>
        </div>
    );
}