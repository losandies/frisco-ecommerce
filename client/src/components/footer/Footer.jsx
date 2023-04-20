import React from "react";
import { BsTwitter, BsGithub, BsLinkedin } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";
import { sizes } from "../../screenSizes";

const Footer = () => {
    const isMobile = useMediaQuery({ maxWidth: sizes.md });

    return (
        <>
            {isMobile ? (
                <div className="absoute bottom-0 flex justify-center h-[50px] w-full bg-neutral-800">
                    <ul className="w-[60%] h-full flex justify-between items-center text-white">
                        <li>
                            <a
                                href="https://twitter.com/307px"
                                className="flex items-center"
                                rel="noreferrer"
                                target="_blank"
                            >
                                <BsTwitter className="mr-1 text-xl" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://github.com/losandies"
                                className="flex items-center"
                                rel="noreferrer"
                                target="_blank"
                            >
                                <BsGithub className="mr-1 text-xl" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.linkedin.com/in/brandon-newsome-58806a1a2/"
                                className="flex items-center"
                                rel="noreferrer"
                                target="_blank"
                            >
                                <BsLinkedin className="mr-1 text-xl" />
                            </a>
                        </li>
                    </ul>
                </div>
            ) : (
                <div className="absolute bottom-0 flex justify-center h-[200px] w-full bg-neutral-800">
                    <div className="w-[60%] h-full flex justify-between pt-5 text-white">
                        <div>
                            <h1 className="font-bold">Built With</h1>
                            <ul>
                                <li>React</li>
                                <li>Tailwind</li>
                                <li>DaisyUI</li>

                                <li>PostgreSQL</li>
                                <li>Node.js</li>
                                <li>Express</li>
                            </ul>
                        </div>
                        <div>
                            <h1 className="font-bold">My Info</h1>
                            <ul>
                                <li>Brandon Newsome</li>
                                <li>Baltimore, MD</li>
                                <li>(443) 972-1212</li>
                                <li>brandonn.dev@gmail.com</li>
                            </ul>
                        </div>
                        <div>
                            <h1 className="font-bold">Social</h1>
                            <ul>
                                <li>
                                    <a
                                        href="https://twitter.com/307px"
                                        className="flex items-center"
                                        rel="noreferrer"
                                        target="_blank"
                                    >
                                        <BsTwitter className="mr-1 text-sm" />{" "}
                                        Twitter
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/losandies"
                                        className="flex items-center"
                                        rel="noreferrer"
                                        target="_blank"
                                    >
                                        <BsGithub className="mr-1 text-sm" />{" "}
                                        Github
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.linkedin.com/in/brandon-newsome-58806a1a2/"
                                        className="flex items-center"
                                        rel="noreferrer"
                                        target="_blank"
                                    >
                                        <BsLinkedin className="mr-1 text-sm" />{" "}
                                        LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Footer;
