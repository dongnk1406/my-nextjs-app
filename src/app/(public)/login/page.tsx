"use client";
import Head from "next/head";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long")
});

type LoginData = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(LoginSchema)
  });

  const onSubmit = (data: FieldValues) => {
    console.log("Form Data:", data?.email, data?.password);
    // Add login logic here (e.g., API call)
  };
  return (
    <React.Fragment>
      <Head>
        <title>Login Page</title>
      </Head>
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message as string}
            />
            <TextField
              margin="normal"
              fullWidth
              id="password"
              label="Password"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message as string}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
