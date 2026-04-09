import './EditionDetailView.css';
import TacticPreviewList from './TacticPreviewList';

function EditionDetailView({prop}){
    const title=prop.element?.name;
    return (
        <>
            <div className={`detialed-view`}>
                <h2 className='version-title'>Football Manager <span>{title?.slice(-2)}</span></h2>
                <div className='card-Collection'>
                    <TacticPreviewList prop={{n: prop.element?.arr.length, isVersion: true, arr: prop.element?.arr || [] }} />
                </div>
            </div>
        </>
    )
}

export default EditionDetailView;