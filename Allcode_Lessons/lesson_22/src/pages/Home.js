
function Home () {
    return (
        <>
            <div className="flex text-4xl justify-center font-semibold bg-blue-300 p-2">
                <h1>Assignment 22 Notes </h1>
            </div>
            <div className=" flex gap-4 bg-blue-300 rounded-xl font-semibold mt-10 items-center">
                <h3 className="ml-4">Easy Task: Use the [Dummy JSON API] (https://dummyjson.com/api) to fetch a list of user names and display them in a `UsersList` component.</h3>
            </div>
            <div className="flex flex-col gap-4 bg-green-300 rounded-xl font-semibold ">
                <h3 className="ml-4 mt-2">Solved:</h3>
                <p className="ml-4">- Created a component called UserList and a component called UserListPage</p>
                <p className="ml-4">
                    - Inside the UserList comp I fetched the api array of objects, assigning it to a useState array. <br />
                    <span className="ml-2" />In the return of UserList() inside the component we loop through the userList state array and writing all the users with their profile picture, fullname and adding a Link element. <br />
                    <span className="ml-2" />
                </p>
            </div>

            <div className="flex gap-4 bg-blue-300 rounded-xl font-semibold mt-10 items-center">
                <h3 className="ml-4">Medium Task: Allow users to click on a name in the `UsersList` component to navigate to a `UserProfile` component where they can see detailed information of the user.</h3>
            </div>
            <div className="flex flex-col gap-4 bg-green-300 rounded-xl font-semibold ">
                <h3 className="ml-4 mt-2">Solved:</h3>
                <p className="ml-4">
                    - The Link element goes to the UserPage component, where we add user.id at the end of the url.
                </p>
                <p className="ml-4">
                    - Inside the UserPage component we fetch the user by just adding /id at the end and then we write out all the info that we want from the api. <br/>
                    <span className="ml-2" />
                </p>
            </div>

            <div className="flex gap-4 bg-blue-300 rounded-xl font-semibold mt-10 items-center">
                <h3 className="ml-4">Hard Task: Implement a `InteractionsContext` to track the number of user profiles visited by the current user. On the main users list page, show the count of profiles visited.</h3>
            </div>
            <div className="flex flex-col gap-4 bg-green-300 rounded-xl font-semibold ">
                <h3 className="ml-4 mt-2">Solved:</h3>
                <p className="ml-4">
                    - 
                </p>
                <p className="ml-4">
                    - <br/>
                    <span className="ml-2" />
                </p>
            </div>

            <div className="flex gap-4 bg-blue-300 rounded-xl font-semibold mt-10  justify-center">
                <h3 className="ml-4 p-2 text-4xl ">What I've learnt from this lesson</h3>
            </div>
            <div className="flex flex-col gap-4 bg-green-300 rounded-xl font-semibold ">
                <span className="mt-2"/>
                <p className="ml-4">
                    - Destructuring, for example in the UserList component where we extract the object from the userList state array. <br/>
                    <span className="ml-2"/> To get access to the user variables so we can write user.image instead of writing in this case (user.user.image) to get the profile picture. 
                    <br/><span className="ml-2" />
                </p>
              
            </div>
        </>
        
    );
}

export default Home;