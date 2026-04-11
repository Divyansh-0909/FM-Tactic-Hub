import './Installation.css';

function Installation(){
    return (
        <>
            <div className='installation-section'>
                <p style={{fontSize: '1.4rem'}}>
                    Get in the game. Plug it in. Dominate & Win.
                </p>
                <div class="folder-open">
                    <div class="folder-open__back">
                    </div>
                    <div class="folder-open__front">

                        <div class="folder-open__paper-blank"/>
                        <div class="folder-open__paper">
                            <h1>HOW TO INSTALL</h1>
                            <ul>
                                <p>
                                    <li>Download the .fmf file from the Google Drive link provided.</li>
                                    <li>Open File Explorer (Windows) or Finder (Mac).</li>
                                    <li>
                                        <u>Navigate to:</u> <br />
                                        Documents <span>{'>'}</span> Sports Interactive <span>{'>'}</span> Football Manager 26 {'>'} tactics
                                    </li>
                                    <li>Move the downloaded .fmf file into this "tactics" folder.</li>
                                    <li>Launch game, go to Tactics screen, load your new tactic!</li>
                                </p>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Installation;