import React from 'react'
import Header from './Header';
import { Tab, Container, Nav, TabContent, TabPane } from 'react-bootstrap';

export default function Covid() {
    return (
        <div>
            <Header />
            <Container>
            <Tab.Container defaultActiveKey="symptoms" id="uncontrolled-tab-example">
            <Nav className="justify-content-center" variant="pills" style={{marginTop:'20px', marginBottom: '30px'}}>
                <Nav.Item>
                <Nav.Link eventKey="symptoms">Symptoms</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="prevention">Prevention</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="treatment">Treatment</Nav.Link>
                </Nav.Item>
             </Nav>
                <TabContent>
                    <TabPane eventKey="symptoms">
                    <p>COVID-19 affects different people in different ways. Most infected people will develop mild to moderate illness and recover without hospitalization.</p>    
                    <hr></hr>
                    <p>Most common symptoms:
                    <ul>
                        <li>fever</li>
                        <li>dry cough</li>
                        <li>tiredness</li>
                    </ul>
                    </p>
                    <p>Less common symptoms:
                    <ul>
                        <li>aches and pains</li>
                        <li>sore throat</li>
                        <li>diarrhoea</li>
                        <li>conjunctivitis</li>
                        <li>headache</li>
                        <li>loss of taste or smell</li>
                        <li>a rash on skin, or discolouration of fingers or toes</li>
                    </ul>
                    </p>                    
                    </TabPane>
                    <TabPane eventKey="prevention">
                       <p>Protect yourself and others around you by knowing the facts and taking appropriate precautions. Follow advice provided by your local health authority.</p>
                       <hr />
                       <p>To prevent the spread of COVID-19:
                           <ul>
                            <li>Clean your hands often. Use soap and water, or an alcohol-based hand rub.</li>
                            <li>Maintain a safe distance from anyone who is coughing or sneezing.</li>
                            <li>Wear a mask when physical distancing is not possible.</li>
                            <li>Don’t touch your eyes, nose or mouth.</li>
                            <li>Cover your nose and mouth with your bent elbow or a tissue when you cough or sneeze.</li>
                            <li>Stay home if you feel unwell.</li>
                            <li>If you have a fever, cough and difficulty breathing, seek medical attention.</li>
                           </ul>
                       </p>
                       <p>Calling in advance allows your healthcare provider to quickly direct you to the right health facility. This protects you, and prevents the spread of viruses and other infections.</p>
                       <p>
                        <strong>Masks</strong> can help prevent the spread of the virus from the person wearing the mask to others. Masks alone do not protect against COVID-19, and should be combined with physical distancing and hand hygiene. Follow the advice provided by your local health authority.</p>
                    </TabPane>
                    <TabPane eventKey="treatment">
                       <p>
                       <strong>Self-care</strong></p>
                       <p>
                        If you feel sick you should rest, drink plenty of fluid, and eat nutritious food. Stay in a separate room from other family members, and use a dedicated bathroom if possible. Clean and disinfect frequently touched surfaces.</p>
                        <p>Everyone should keep a healthy lifestyle at home. Maintain a healthy diet, sleep, stay active, and make social contact with loved ones through the phone or internet. Children need extra love and attention from adults during difficult times. Keep to regular routines and schedules as much as possible.</p>
                        <p>It is normal to feel sad, stressed, or confused during a crisis. Talking to people you trust, such as friends and family, can help. If you feel overwhelmed, talk to a health worker or counsellor.
                        </p>
                        <hr />
                        <p>
                        <strong>Medical treatments</strong></p>
                        <p>If you have mild symptoms and are otherwise healthy, self-isolate and contact your medical provider or a COVID-19 information line for advice.</p>
                        <p>Seek medical care if you have a fever, cough, and difficulty breathing. Call in advance.
                        </p>
                    </TabPane>
                </TabContent>
            </Tab.Container>
            </Container>
        </div>
    )
}
