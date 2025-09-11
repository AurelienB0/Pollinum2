import Spacer from "@/components/Spacer";
import { useSignIn, useSSO } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import * as React from "react";
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";

export default function SignUpScreen() {
	const { signIn, setActive, isLoaded } = useSignIn();
	const router = useRouter();

	const [emailAddress, setEmailAddress] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [error, setError] = React.useState("");
	const [pwd1, togglePwd1] = React.useState(false);

	const { startSSOFlow } = useSSO();

	const handleGoogleSignIn = async () => {
		try {
			const { createdSessionId, setActive } = await startSSOFlow({
				strategy: "oauth_google",
			});
			if (setActive && createdSessionId) {
				setActive({ session: createdSessionId });
				router.replace("/(protected)/(tabs)");
			}
		} catch (error) {
			console.error("OAuth error :", error);
		}
	};
	const onSignInPress = async () => {
		if (!isLoaded) return;

		// Start the sign-in process using the email and password provided
		try {
			const signInAttempt = await signIn.create({
				identifier: emailAddress,
				password,
			});

			// If sign-in process is complete, set the created session as active
			// and redirect the user
			if (signInAttempt.status === "complete") {
				await setActive({ session: signInAttempt.createdSessionId });
				router.replace("/");
			} else {
				// If the status isn't complete, check why. User might need to
				// complete further steps.
				console.error(JSON.stringify(signInAttempt, null, 2));
			}
		} catch (err) {
			const e = err as Error;
			switch (e.message) {
				case "`identifier` is required when `strategy` is `password`.":
					setError("E-mail is missing");
				case "Identifier is invalid.":
					setError("E-mail is invalid");
				case "The verification strategy is not valid for this account":
					setError("An account already exists with this E-mail");
				default:
					setError(e.message);
			}
		}
	};

	return (
		// <View style={styles.container}>
		// 	<>
		// 		<Text>Sign up</Text>
		// 		<TextInput
		// 			autoCapitalize="none"
		// 			value={emailAddress}
		// 			placeholder="Enter email"
		// 			onChangeText={(email) => setEmailAddress(email)}
		// 		/>
		// 		<TextInput
		// 			value={password}
		// 			placeholder="Enter password"
		// 			secureTextEntry={true}
		// 			onChangeText={(password) => setPassword(password)}
		// 		/>
		// 		<TouchableOpacity onPress={onSignInPress}>
		// 			<Text>Continue</Text>
		// 		</TouchableOpacity>
		// 		<View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
		// 			<Text>Already have an account?</Text>
		// 			<Link href="/signup">
		// 				<Text>Sign in</Text>
		// 			</Link>
		// 		</View>
		// 	</>
		// </View>

		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<ScrollView contentContainerStyle={[styles.container, { flexGrow: 1 }]}>
					<Spacer space={30} />
					<Text style={styles.title}>Pollinum</Text>
					<View style={styles.card}>
						<Text style={styles.welcome}>Welcome back !</Text>
						<Spacer space={30} />
						{/* Auth services */}
						<TouchableOpacity onPress={handleGoogleSignIn} style={styles.auth}>
							<Ionicons
								name="logo-google"
								size={20}
								color={"#000000ff"}
								style={{ opacity: 0.55 }}
							/>
							<Text style={{ fontSize: 15, opacity: 0.55 }}>
								Continue with Google
							</Text>
						</TouchableOpacity>
						<Spacer space={15} />
						<TouchableOpacity onPress={handleGoogleSignIn} style={styles.auth}>
							<Ionicons name="logo-apple" size={20} style={{ opacity: 0.55 }} />
							<Text style={{ fontSize: 15, opacity: 0.55 }}>
								Continue with Apple
							</Text>
						</TouchableOpacity>
						{/* text fields */}
						<Spacer space={25} />

						<TextInput
							autoCapitalize="none"
							value={emailAddress}
							placeholder="E-mail"
							onChangeText={setEmailAddress}
							style={styles.field}
							keyboardType={"email-address"}
							placeholderTextColor={"#695a2799"}
						/>
						<Spacer space={15} />
						<View style={styles.field}>
							<TextInput
								style={styles.input}
								autoCapitalize="none"
								value={password}
								placeholder="Password"
								onChangeText={setPassword}
								secureTextEntry={pwd1}
								placeholderTextColor={"#695a2799"}
							/>
							<Pressable
								onPress={() => {
									togglePwd1(!pwd1);
								}}
							>
								<Ionicons name={pwd1 ? "eye-off" : "eye"} size={15} />
							</Pressable>
						</View>

						<Spacer space={15} />
						{error && (
							<View style={styles.error}>
								<Text
									style={{
										fontSize: 12,
										color: "#884b4bff",
										textAlign: "center",
									}}
								>
									{error}
								</Text>
							</View>
						)}

						<Text style={styles.agreement}>
							{/*ajouter lien + pdf */}
							Contact us if you forgot your password
						</Text>
						<Spacer space={30} />
						<TouchableOpacity style={styles.btn} onPress={onSignInPress}>
							<Text style={styles.txtbtn}>Sign in with Email</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.already}>
						<Text
							style={{ textAlign: "center", fontSize: 12, color: "#444600" }}
						>
							First time ?
						</Text>
						<Link href="/signup" style={styles.signin}>
							<Text>Sign up</Text>
						</Link>
					</View>
				</ScrollView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ecebe0",
		justifyContent: "space-evenly",
		paddingHorizontal: 20,
	},
	title: {
		textAlign: "center",
		fontSize: 30,
		fontWeight: "500",
		color: "#849A10",
	},
	card: {
		backgroundColor: "#ffffff",
		borderRadius: 5,
		width: "100%",
		paddingVertical: 30,
		paddingHorizontal: 20,
	},
	welcome: {
		textAlign: "center",
		fontSize: 30,
		fontWeight: "500",
		color: "#2a2b03",
	},
	code: {
		backgroundColor: "#ecebe0",
		borderRadius: 5,
		padding: 10,
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	txtcode: {
		fontSize: 12,
		color: "#695a27",
		alignSelf: "center",
	},
	auth: {
		borderRadius: 100,
		backgroundColor: "#ecebe050",
		paddingVertical: 15,
		paddingHorizontal: 80,
		borderWidth: 1,
		borderColor: "#cfcec3ff",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
	},
	field: {
		backgroundColor: "#ecebe0",
		paddingHorizontal: 20,
		paddingVertical: 15,
		borderRadius: 5,
		fontSize: 12,
		color: "#695a2799",
		flexDirection: "row",
		height: 45,
		alignItems: "center",
	},
	input: {
		flex: 1,
		paddingVertical: 0,
		fontSize: 12,
		color: "#00000099",
	},
	error: {
		backgroundColor: "#f8e4e4ff",
		borderRadius: 5,

		padding: 20,
	},
	agreement: {
		fontSize: 10,
		color: "#695a2799",
		textAlign: "center",
	},
	btn: {
		paddingVertical: 15,
		backgroundColor: "#4d5813",
		borderRadius: 200,
	},
	txtbtn: {
		textAlign: "center",
		color: "#ffffff",
		fontSize: 20,
	},
	already: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		paddingHorizontal: 120,
	},
	signin: {
		color: "#2a8db4",
		fontSize: 12,
	},
});
