import Spacer from "@/components/Spacer";
import { useSignUp, useSSO } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React from "react";
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

export default function Page() {
	const { isLoaded, signUp, setActive } = useSignUp();
	const router = useRouter();

	const [emailAddress, setEmailAddress] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [pendingVerification, setPendingVerification] = React.useState(false);
	const [code, setCode] = React.useState("");

	const [confPassword, setConfPwd] = React.useState("");
	const [pwd1, togglePwd1] = React.useState(false);
	const [pwd2, togglePwd2] = React.useState(false);
	const [error, setError] = React.useState("");

	const { startSSOFlow } = useSSO();
	const handleGoogleSignIn = async () => {
		try {
			const { createdSessionId, setActive } = await startSSOFlow({
				strategy: "oauth_google",
			});
			if (setActive && createdSessionId) {
				setActive({ session: createdSessionId });
				router.replace("/(protected)/(tabs)/interiorPlants");
			}
		} catch (error) {
			console.error("OAuth error :", error);
		}
	};
	const onSignUpPress = async () => {
		if (!isLoaded) return;

		// Start sign-up process using email and password provided
		try {
			await signUp.create({
				emailAddress,
				password,
			});

			// Send user an email with verification code
			await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

			// Set 'pendingVerification' to true to display second form
			// and capture OTP code
			setPendingVerification(true);
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			// const e = err as Error;
			// switch (e.message) {
			// 	case "`identifier` is required when `strategy` is `password`.":
			// 		setError("E-mail is missing");
			// 	case "Identifier is invalid.":
			// 		setError("E-mail is invalid");
			// 	case "The verification strategy is not valid for this account":
			// 		setError("An account already exists with this E-mail");
			// 	default:
			// 		setError(e.message);
			// }

			console.log(JSON.stringify(err, null, 2));
		}
	};

	// Handle submission of verification form
	const onVerifyPress = async () => {
		if (!isLoaded) return;
		if (password !== confPassword) {
			setError("Passwords are not matching");
			return;
		}
		try {
			// Use the code the user provided to attempt verification
			const signUpAttempt = await signUp.attemptEmailAddressVerification({
				code,
			});

			// If verification was completed, set the session to active
			// and redirect the user
			if (signUpAttempt.status === "complete") {
				await setActive({ session: signUpAttempt.createdSessionId });
				//router.replace("/(protected)/(tabs)/interiorPlants");
			} else {
				// If the status is not complete, check why. User may need to
				// complete further steps.
				console.error(JSON.stringify(signUpAttempt, null, 2));
			}
		} catch (err) {
			const e = err as Error;
			setError(e.message);
			console.log(JSON.stringify(err, null, 2));
		}
	};

	if (pendingVerification) {
		return (
			<View style={styles.container}>
				<View style={styles.card}>
					<Text style={[styles.welcome, { fontSize: 23 }]}>
						Just a security check.
					</Text>
					<Spacer space={30} />
					<Text style={{ fontSize: 15, color: "#695a27", textAlign: "center" }}>
						We sent you a confirmation code at the adress {emailAddress}
					</Text>
					<Spacer space={30} />
					<View style={styles.code}>
						<Text style={styles.txtcode}>Your code : </Text>
						<TextInput
							value={code}
							placeholder="ex. 000000"
							onChangeText={setCode}
							style={[styles.code, { backgroundColor: "#fff", width: 100 }]}
							keyboardType={"numeric"}
							placeholderTextColor={"#695a2799"}
						/>
					</View>
					<Spacer space={15} />
					<View style={styles.already}>
						<Text
							style={{ textAlign: "center", fontSize: 12, color: "#695a2799" }}
						>
							I didn’t recieve the code ?
						</Text>
						<Link href="/signup" style={{ fontSize: 12, color: "#0084B899" }}>
							<Text>Go Back</Text>
						</Link>
					</View>
					<Spacer space={100} />
					<TouchableOpacity style={styles.btn} onPress={onVerifyPress}>
						<Text style={styles.txtbtn}>Verify</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
			keyboardVerticalOffset={30}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<ScrollView contentContainerStyle={[styles.container, { flexGrow: 1 }]}>
					<Text style={styles.title}>Pollinum</Text>
					<View style={styles.card}>
						<Text style={styles.welcome}>Welcome !</Text>
						<Spacer space={30} />
						{/* Auth services */}
						<TouchableOpacity onPress={handleGoogleSignIn} style={styles.auth}>
							<Ionicons
								name="logo-google"
								size={20}
								color={"#000000ff"}
								style={{ opacity: 0.55 }}
							/>
							<Text style={styles.services}>Sign up with Google</Text>
						</TouchableOpacity>
						<Spacer space={15} />
						<TouchableOpacity onPress={handleGoogleSignIn} style={styles.auth}>
							<Ionicons name="logo-apple" size={20} style={{ opacity: 0.55 }} />
							<Text style={styles.services}>Sign up with Apple</Text>
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
						<View style={styles.field}>
							<TextInput
								style={styles.input}
								autoCapitalize="none"
								value={confPassword}
								placeholder="Confirm password"
								onChangeText={setConfPwd}
								secureTextEntry={pwd2}
								placeholderTextColor={"#695a2799"}
							/>
							<Pressable
								onPress={() => {
									togglePwd2(!pwd2);
								}}
							>
								<Ionicons name={pwd2 ? "eye-off" : "eye"} size={15} />
							</Pressable>
						</View>

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

						<Spacer space={30} />
						<Text style={styles.agreement}>
							{/*ajouter lien + pdf */}
							By signing-up you accept the term & agreement license
						</Text>
						<Spacer space={30} />
						<TouchableOpacity style={styles.btn} onPress={onSignUpPress}>
							<Text style={styles.txtbtn}>Sign up</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.already}>
						<Text style={[styles.signin, { color: "#444600" }]}>
							Already have an account ?
						</Text>
						<View style={{ width: 10 }} />

						<Link href="/signin" style={styles.signin}>
							<Text>Sign in</Text>
						</Link>
						<Spacer space={25} />
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
		fontFamily: "UrbanistSemiBold",
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
		fontFamily: "UrbanistSemiBold",
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
	services: {
		fontSize: 15,
		color: "#444600",
		fontFamily: "UrbanistMedium",
	},
	auth: {
		borderRadius: 100,
		backgroundColor: "#ecebe050",
		paddingVertical: 15,
		paddingHorizontal: "20%",
		borderWidth: 1,
		borderColor: "#cfcec3ff",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
		elevation: 5,
	},
	field: {
		backgroundColor: "#ecebe0",
		paddingHorizontal: 20,
		paddingVertical: 15,
		borderRadius: 5,
		fontSize: 12,
		fontFamily: "UrbanistRegular",
		color: "#695a2799",
		flexDirection: "row",
		height: 45,
		alignItems: "center",
	},
	input: {
		flex: 1,
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
		fontFamily: "UrbanistMedium",
	},
	btn: {
		height: 61,
		paddingVertical: 15,
		backgroundColor: "#4d5813",
		borderRadius: 32,
	},
	txtbtn: {
		textAlign: "center",
		color: "#ffffff",
		fontSize: 20,
		fontFamily: "UrbanistSemiBold",
	},
	already: {
		flexDirection: "row",
		justifyContent: "center",
		paddingHorizontal: 70,
	},
	signin: {
		color: "#2a8db4",
		fontSize: 12,
		fontFamily: "UrbanistRegular",
	},
});
