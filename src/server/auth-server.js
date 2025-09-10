const authServerConfig = (server) => {
  server.post(
    "/auth/register",
    (schema, request) => {
      const requestData = JSON.parse(request.requestBody);
      const { email, password } = requestData;

      // Check if the email already exists
      const existingUser = schema.users.findBy({ email });
      if (existingUser) {
        return new Response(400, {}, { error: "Email is already registered" });
      }

      // Create a new user
      const user = schema.users.create({
        email,
        password,
      });

      // Generate fake JWT tokens
      const access_token = "fake-access-token-" + Date.now();
      const refresh_token = "fake-refresh-token-" + Date.now();

      return {
        access_token,
        refresh_token,
        token_type: "Bearer",
        expires_in: 3600,
        user: user.attrs,
      };
    }
    // { timing: 2000 }
  );

  // Login route
  server.post(
    "/auth/login",
    (schema, request) => {
      const requestData = JSON.parse(request.requestBody);
      const { email, password } = requestData;

      // Find the user by email
      const user = schema.users.findBy({ email });

      if (!user) {
        return new Response(
          401, 
          {}, 
          { 
            error: true,
            message: "Incorrect email or password",
            status_code: 401
          }
        );
      }

      if (user.password !== password) {
        return new Response(
          401, 
          {}, 
          { 
            error: true,
            message: "Incorrect email or password",
            status_code: 401
          }
        );
      }

      // Generate fake JWT tokens
      const access_token = "fake-access-token-" + Date.now();
      const refresh_token = "fake-refresh-token-" + Date.now();

      return {
        access_token,
        refresh_token,
        token_type: "Bearer",
        expires_in: 3600,
        user: user.attrs,
      };
    }
    // { timing: 2000 }
  );

  // Refresh token route
  server.post("/auth/refresh", (schema, request) => {
    const requestData = JSON.parse(request.requestBody);
    const { refresh_token } = requestData;

    if (!refresh_token) {
      return new Response(400, {}, { error: "Refresh token is required" });
    }

    // Generate new fake JWT tokens
    const access_token = "fake-access-token-" + Date.now();
    const new_refresh_token = "fake-refresh-token-" + Date.now();

    return {
      access_token,
      refresh_token: new_refresh_token,
      token_type: "Bearer",
      expires_in: 3600,
    };
  });

  server.post("/auth/logout", () => {
    return {};
  });
};

export default authServerConfig;
