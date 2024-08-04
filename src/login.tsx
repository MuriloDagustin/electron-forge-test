import { useEffect, useState } from "react";
import { Button, Card, Col, Form, FormLabel } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type Inputs = {
    email: string,
    password: string
};

const schema: ZodType<Inputs> = z.object({
    email: z.string().email(),
    password: z.string().min(8)
}).required();

export default function Login() {
    const { handleSubmit, control, formState: { errors, submitCount } } = useForm<Inputs>({
        resolver: zodResolver(schema),
        defaultValues: {
            "email": '',
            "password": ''
        },
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
    }

    useEffect(() => {
        console.log(submitCount)
    }, [submitCount])

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center min-vh-100 min-vw-100">
                <Card style={{ minWidth: '120px', maxWidth: '480px' }} className="py-3 px-3 shadow-md border-0">
                    <Form onSubmit={handleSubmit(onSubmit)} noValidate className="row gy-3">
                        <Col xs={12}>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Form.Group>
                                            <Form.Label htmlFor="email">Email</Form.Label>
                                            <Form.Control isInvalid={!!errors.email} id="email" type="email" placeholder="email@123.com" {...field}></Form.Control>
                                            {errors.email && <Form.Control.Feedback type="invalid">{errors.email.message}</Form.Control.Feedback>}
                                        </Form.Group>
                                    )
                                }}
                            />
                        </Col>

                        <Col xs={12}>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Form.Group>
                                            <Form.Label htmlFor="password">Password</Form.Label>
                                            <Form.Control isInvalid={!!errors.password} id="password" type="password" placeholder="12345678" {...field}></Form.Control>
                                            {errors.password && <Form.Control.Feedback type="invalid">{errors.password.message}</Form.Control.Feedback>}
                                        </Form.Group>
                                    )
                                }}
                            />
                        </Col>

                        <Col xs={12} className="mt-4">
                            <Button className="w-100" size="lg" type="submit">Login</Button>
                        </Col>
                    </Form>
                </Card>
            </Container>
        </>
    );
}