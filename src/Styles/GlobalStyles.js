import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
	${reset};
	@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,600,700");
	* {
		box-sizing: border-box;
	}
	html, body {
		position: relative;
		width: 100%;
		height: 100vh;
	}
	body {
		${(props) => props.theme.grid};
		color: ${(props) => props.theme.blue};
		font-size: 14px;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		padding-top: 160px;
	}
	a {
		color: ${(props) => props.theme.blue};
		text-decoration: none;
		&:hover {
			color: ${(props) => props.theme.pink};
		}
	}
	input:focus {
		outline:none;
	}
	textarea {
		border: none;
		resize: none;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		&::placeholder {
			color: ${(props) => props.theme.blue};
		}
	}
`;
