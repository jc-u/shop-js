import { auth, signOut, signIn } from "@/auth";

const Header = async () => {
	const session = await auth();

	return (
		<header>
			<h1>Shop</h1>
			{session ? (
				<>
					<form
						action={async () => {
							"use server";
							await signOut();
						}}>
						<button type="submit">Déconnexion</button>
					</form>
					{/* <Link href={"/list/my-list"}>Mes tâches</Link> */}
				</>
			) : (
				<form
					action={async () => {
						"use server";
						await signIn();
					}}>
					<button type="submit">Connexion</button>
				</form>
			)}
		</header>
	);
};

export default Header;
