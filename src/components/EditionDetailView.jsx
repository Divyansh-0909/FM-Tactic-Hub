import './EditionDetailView.css';
import { tacticsData } from './tacticData';
import TacticPreviewList from './TacticPreviewList';

function EditionDetailView(prop){
    const data = tacticsData.find((t) => t.name === 'Football Manager 24');
    return (
        <>
            <div className={`detialed-view ${prop.visibility? 'detialed-view--inactive': ''}`}>
                <h2 className='version-title'>Football Manager <span>24</span></h2>
                <div className='card-Collection'>
                    <TacticPreviewList prop={{n: data.arr.length, isVersion: true, arr: data?.arr || [] }} />
                </div>
            </div>
        </>
    )
}

export default EditionDetailView;