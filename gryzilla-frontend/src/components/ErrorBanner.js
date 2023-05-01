export default function ErrorBanner({placeholder}) {

    return (
        <div className="d-flex justify-content-center" style={{color: "red"}}>
            {placeholder}
        </div>
    );
}