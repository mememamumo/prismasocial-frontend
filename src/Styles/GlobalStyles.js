import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
	${reset};
	@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,600,700");
	* {
		box-sizing: border-box;
	}
	html, body {width: 100%;
		height: 100%;}
	body {
		${(props) => props.theme.grid};
		color: ${(props) => props.theme.blue};
		font-size: 14px;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		padding-top: 140px;
	}
	a {
		color: ${(props) => props.theme.lightBlue};
		text-decoration: none;
	}
	input:focus {
		outline:none;
	}
`;
