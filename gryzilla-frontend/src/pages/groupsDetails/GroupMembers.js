import ProfileFollow from "../profile/components/ProfileFollow";

export default function GroupMembers({groupData}) {

    return (
		<>
			<div className="d-flex flex-wrap">
				{groupData &&
					groupData.users.map((member, index) => {
						return (
							<ProfileFollow
								key={member.idUser}
								idUser={member.idUser}
								nick={member.nick}
							/>
						);
					})}
			</div>
		</>
	);
}