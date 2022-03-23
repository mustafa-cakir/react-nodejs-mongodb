import React, { useState } from 'react';
import Alert from '../../common/components/Alert';
import FeatherIcons from './FeatherIcons';
import Icons from '../../common/components/Icons';
import Modal from '../../common/components/Modal';
import Percentage from '../../common/components/Percentage';
import Shimmer from '../../common/components/Shimmer';
import ShimmerItem from '../../common/components/Shimmer/ShimmerItem';
import WithAnimaation from '../../common/components/WithAnimation';

const UIKit = () => {
    const [isModal, setIsModal] = useState(false);
    const [isWithAnimation, setIsWithAnimation] = useState(false);

    return (
        <div className="ui-kit-page" data-testid="ui-kit">
            <div className="container">
                <div className="ui-box ui-mb-30">
                    <h2>Typography</h2>
                    <hr />
                    <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h1>
                    <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>
                    <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
                    <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
                    <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h5>
                    <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h6>
                    <hr />
                    <code>Lorem ipsum dolor sit amet, consectetur adipiscing elit</code>
                    <hr />
                    <div className="ui-text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                </div>
                <div className="ui-box ui-mb-30">
                    <h2>Percantage Component</h2>
                    <div className="ui-mb-10">
                        <Percentage changePercent={-0.12} />
                    </div>
                    <div className="ui-mb-10">
                        <Percentage changePercent={0.14} />
                    </div>
                </div>
                <div className="ui-box ui-mb-30">
                    <h2>Shimmer Loading</h2>
                    <Shimmer>
                        <ShimmerItem height={20} width={200} marginBottom={10} />
                        <ShimmerItem height={20} width={200} marginBottom={10} />
                        <ShimmerItem height={20} width={300} marginBottom={10} />
                        <ShimmerItem height={20} width={400} marginBottom={10} />
                        <ShimmerItem height={20} width={400} marginBottom={10} />
                        <ShimmerItem height={20} width={300} marginBottom={10} />
                    </Shimmer>
                </div>
                <div className="ui-box ui-mb-30">
                    <h2>With Animation</h2>
                    <button type="button" className="ui-link" onClick={() => setIsWithAnimation(x => !x)}>
                        Click to toggle content below (with animation)
                    </button>
                    <WithAnimaation isShow={isWithAnimation}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                        </p>
                    </WithAnimaation>
                </div>
                <div className="ui-box ui-mb-30">
                    <h2>Modal</h2>
                    {isModal && (
                        <Modal closeHandler={() => setIsModal(false)} title="The standard Lorem Ipsum passage">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum
                            </p>
                            <strong>
                                Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                            </strong>
                            <p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                                architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                                sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                                voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                                amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut
                                labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
                                nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
                                consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
                                nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
                                pariatur?
                            </p>
                        </Modal>
                    )}
                    <button type="button" className="ui-link" onClick={() => setIsModal(true)}>
                        Click to open modal
                    </button>
                </div>
                <div className="ui-box ui-mb-30">
                    <h2>Alert Component</h2>
                    <div className="ui-mb-15">
                        <Alert
                            type="error"
                            message="Error messge will go here. Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                        />
                    </div>

                    <div className="ui-mb-15">
                        <Alert
                            type="info"
                            message="Info messge will go here. Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                        />
                    </div>
                    <div className="ui-mb-15">
                        <Alert
                            type="success"
                            message="Success messge will go here. Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                        />
                    </div>
                    <div className="ui-mb-15">
                        <Alert
                            type="warning"
                            message="Warning messge will go here. Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                        />
                    </div>
                </div>

                <div className="ui-box ui-mb-30">
                    <h2>Input</h2>
                    <div className="ui-max-w-300 ui-mb-20">
                        <input type="text" className="ui-input" placeholder="Placeholder goes here" />
                    </div>
                    <div className="ui-max-w-300 ui-mb-20">
                        <div className="ui-input-wrapper">
                            <Icons name="user" />
                            <input type="text" className="ui-input" placeholder="Placeholder goes here" />
                        </div>
                    </div>
                </div>
                <div className="ui-box ui-mb-30">
                    <h2>Feather Icons</h2>
                    <FeatherIcons />
                </div>
            </div>
        </div>
    );
};

export default UIKit;
