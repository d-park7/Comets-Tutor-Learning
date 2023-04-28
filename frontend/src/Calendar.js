class Calendar extends React.Component {

    async oauth_request() {
        var state = generateRandomString();
        localStorage.setItem("pkce_state", state);

        // Create and store a new PKCE code_verifier (the plaintext random secret)
        var code_verifier = generateRandomString();
        localStorage.setItem("pkce_code_verifier", code_verifier);

        // Hash and base64-urlencode the secret to use as the challenge
        var code_challenge = await pkceChallengeFromVerifier(code_verifier);

        // Build the authorization URL
        var url = config.authorization_endpoint 
            + "?response_type=code"
            + "&client_id="+encodeURIComponent(config.client_id)
            + "&state="+encodeURIComponent(state)
            + "&scope="+encodeURIComponent(config.requested_scopes)
            + "&redirect_uri="+encodeURIComponent(config.redirect_uri)
            + "&code_challenge="+encodeURIComponent(code_challenge)
            + "&code_challenge_method=S256"
            ;
            
        return url;
    }
    
    
}
    

export default Calendar;