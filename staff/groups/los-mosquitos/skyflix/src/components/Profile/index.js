import React from 'react'
import literals from './literals'
import userApi from '../../data/user-api'

function Profile({ lang, handlechngPass }) {






    return <div>

        <div>

            <img src="" className="profile image"></img>

        </div>

        <div>
            <form onSubmit={handlechngPass}>

                <p>
                    <label>Fullname</label> : <input type="text" name="fullname" disabled />
                </p>
                <p>
                    <label>email</label> : <input type="text" name="email" disabled />
                </p>
                <p>
                    <label>If you want to change your password, introduce the new one</label> : <input type="password" name="changePassword" />
                    <button>Change your password</button>
                </p>

            </form>
        </div>

        <div>
            <form >
                <p>
                    <label>If you want to cancel your suscription</label> : <button>Cancel suscription</button>
                </p>
            </form>
        </div>

    </div>


}




export default Profile


