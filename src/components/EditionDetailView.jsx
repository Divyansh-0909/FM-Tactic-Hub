import './EditionDetailView.css';

function EditionDetailView(prop){
    return (
        <>
            <div className={`detialed-view ${prop.visibility? 'detialed-view--inactive': ''}`}>
                
            </div>
        </>
    )
}

export default EditionDetailView;