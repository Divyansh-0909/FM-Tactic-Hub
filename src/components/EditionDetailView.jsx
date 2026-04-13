import './EditionDetailView.css';
import TacticPreviewList from './TacticPreviewList';

function EditionDetailView({prop}){
    const title=prop.element?.name;
    return (
        <>
            <div className={`detialed-view`}>
                <div className="version-title">
                    <h1>FM<span>{title?.slice(-2)}</span></h1>
                    <p>
                        Every tactic. Every formation. <br />
                        One edition. One place. <br />
                        Download or read the full thread on X.
                    </p>
                </div>
                <div className='card-Collection'>
                    <TacticPreviewList prop={{n: prop.element?.arr.length, isVersion: true, arr: prop.element?.arr || [] }} />
                </div>
            </div>
        </>
    )
}

export default EditionDetailView;