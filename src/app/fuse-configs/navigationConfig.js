const navigationConfig = [
	{
		id: 'photos',
		title: 'Photo Sharing',
		type: 'group',
		icon: 'collections',
		url: '/',
		role: [],
		children: [
			{
				id: 'nature',
				title: 'Nature',
				type: 'item',
				icon: 'filter',
				url: '/photos/nature',
				role: []
			},
			{
				id: 'architecture',
				title: 'Architecture',
				type: 'item',
				icon: 'photo',
				url: '/photos/architecture',
				role: []
			},
			{
				id: 'fashion',
				title: 'Fashion',
				type: 'item',
				icon: 'photo_library',
				url: '/photos/fashion',
				role: []
			}			
		]
	}
];

export default navigationConfig;
