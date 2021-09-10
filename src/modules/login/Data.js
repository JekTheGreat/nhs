export const session = [
	"id",
	"accessToken",
	"refreshToken",
	"expiresAt",
	"userId",
	[
		"user", [
			"id",
			"firstName",
			"lastName",
			"username",
			"isVerifiedEmail",
			"isVerifiedMobile",
			"verificationCode",
			"verificationExpiresAt",
			"isTwoFactorAuth",
			"email",
			"mobile",
			"enableEmailAlert",
			"enableSMSAlert",
			"loginAlert",
			"transactionAlert",
		],
	],
];

export const checking = [
	"mobile",
	"email",
	"isVerifiedEmail",
	"isVerifiedMobile",
	[
		"client", [
			"id",
			"status",
			"userId",
			"firstName",
			"lastName",
			"isKycFiled",
			"idPhoto",
			"addressPhoto",
			"gender",
			"idSelfieStatus",
			"addressProofStatus",
		],
	],
	[
		"outlet", [
			"isActive",
		],
	],
];

