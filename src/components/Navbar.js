import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { connectBC, disconnectBC, getTokenData, addToken } from '../redux/readBC';

export const NavBar = () => {

    const dispatch = useDispatch();

    const data = useSelector((state) => state.data);
    const acc = data.account > 0 ? data.account : "";
    const contract = data.contract;

    const connectHandler = () => {
        try {
            if (!acc) {
                dispatch(connectBC());
            }
            else {
                dispatch(disconnectBC())
            }
        } catch (error) {
            console.log('error connecting', error)
        }
    }


    useEffect(async () => {
        if (acc && contract) {
            await getTokenData(dispatch);
        }
    }, [acc, contract])


    return (
        <div class="Nav">
            <>
                <Navbar bg="dark" variant={"dark"} expand="lg" sticky="top" >
                    <Container>
                        <Navbar.Brand href="#"></Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />

                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScrol
                            >
                                <Nav.Link as={Link} to="/"> Main </Nav.Link>
                                <Nav.Link as={Link} to="/Mint"> Mint </Nav.Link>
                                <Nav.Link as={Link} to="/Listing"> Listing </Nav.Link>
                                <Nav.Link as={Link} to="/Buy"> Buy </Nav.Link>
                            </Nav>

                            <Nav>
                                <div>
                                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                        <button type="button" class="btn btn-primary "
                                            onClick={(e) => {
                                                e.preventDefault();
                                                connectHandler();
                                            }}>
                                            {!acc && !data.readLoading && "Connect"}
                                            {!acc && data.readLoading && "Connecting"}
                                            {acc && !data.readLoading &&
                                                <>
                                                    <button type="button" class="btn btn-danger btn-sm ">X</button>
                                                    &emsp;
                                                    ACC***{data.account > 0 ? (acc.substr(0, 5)) + "*****" + (acc.substr(39, 3)) : " "}
                                                </>
                                            }
                                        </button>
                                        {acc && !data.readLoading ?
                                            <button type="button" class="btn btn-danger btn-sm "
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    addToken(dispatch);
                                                }}>
                                                Add {data.symbol}
                                            </button>
                                            : ""}
                                    </div>
                                </div>

                            </Nav>

                        </Navbar.Collapse>
                    </Container>

                </Navbar>

            </>



        </div>
    )
}
