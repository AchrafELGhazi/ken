import { isClientUser, isNGOUser, useAuth } from '@/context/UserContext';

export const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className='p-4'>Please log in to view your data.</div>;
  }

  if (isClientUser(user)) {
    return (
      <div className='p-4 space-y-4'>
        <h2 className='text-2xl font-bold'>Client Profile</h2>

        <section className='space-y-2'>
          <h3 className='text-xl font-semibold'>Personal Information</h3>
          <p>Full Name: {user.fullName}</p>
          <p>Email: {user.email}</p>
          <p>
            Date of Birth: {new Date(user.dateOfBirth).toLocaleDateString()}
          </p>
          <p>Gender: {user.gender}</p>
          <p>Nationality: {user.nationality}</p>
          <p>
            Location: {user.city}, {user.country}
          </p>
          <p>Phone: {user.phone}</p>
          {user.linkedIn && <p>LinkedIn: {user.linkedIn}</p>}
        </section>

        <section className='space-y-2'>
          <h3 className='text-xl font-semibold'>Education & Work</h3>
          <p>Education Level: {user.educationLevel}</p>
          <p>Occupation: {user.occupation}</p>
          {user.institution && <p>Institution: {user.institution}</p>}
          <p>Languages: {user.languages}</p>
        </section>

        <section className='space-y-2'>
          <h3 className='text-xl font-semibold'>Interests & Goals</h3>
          <p>Fields of Interest: {user.fieldsOfInterest.join(', ')}</p>
          {user.otherFieldOfInterest && (
            <p>Other Interests: {user.otherFieldOfInterest}</p>
          )}
          <p>Opportunity Types: {user.opportunityTypes.join(', ')}</p>
          {user.otherOpportunityType && (
            <p>Other Opportunities: {user.otherOpportunityType}</p>
          )}
          <p>Career Goals: {user.careerGoals}</p>
          <p>Availability: {user.availability.join(', ')}</p>
        </section>

        <section className='space-y-2'>
          <h3 className='text-xl font-semibold'>Documents</h3>
          {user.cv && (
            <p>
              CV:{' '}
              <a href={user.cv.url} className='text-blue-600 hover:underline'>
                View CV
              </a>
            </p>
          )}
          {user.portfolio && (
            <p>
              Portfolio:{' '}
              <a
                href={user.portfolio.url}
                className='text-blue-600 hover:underline'
              >
                View Portfolio
              </a>
            </p>
          )}
          {user.recommendationLetters && (
            <div>
              <p>Recommendation Letters:</p>
              <ul className='list-disc pl-5'>
                {user.recommendationLetters.map((doc, index) => (
                  <li key={doc.cloudinaryId}>
                    <a href={doc.url} className='text-blue-600 hover:underline'>
                      Letter {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    );
  }

  if (isNGOUser(user)) {
    return (
      <div className='p-4 space-y-4'>
        <h2 className='text-2xl font-bold'>NGO Profile</h2>

        <section className='space-y-2'>
          <h3 className='text-xl font-semibold'>Basic Information</h3>
          <p>Organization Name: {user.orgName}</p>
          <p>Organization Type: {user.orgType}</p>
          {user.otherOrgType && <p>Other Type: {user.otherOrgType}</p>}
          <p>Establishment Year: {user.establishmentYear}</p>
          <p>
            Location: {user.city}, {user.country}
          </p>
          <p>
            Website:{' '}
            <a href={user.website} className='text-blue-600 hover:underline'>
              {user.website}
            </a>
          </p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
        </section>

        <section className='space-y-2'>
          <h3 className='text-xl font-semibold'>Social Media</h3>
          {user.socialMedia?.linkedin && (
            <p>LinkedIn: {user.socialMedia.linkedin}</p>
          )}
          {user.socialMedia?.twitter && (
            <p>Twitter: {user.socialMedia.twitter}</p>
          )}
          {user.socialMedia?.facebook && (
            <p>Facebook: {user.socialMedia.facebook}</p>
          )}
        </section>

        <section className='space-y-2'>
          <h3 className='text-xl font-semibold'>Representative</h3>
          <p>Name: {user.representative.name}</p>
          <p>Role: {user.representative.role}</p>
          <p>Email: {user.representative.email}</p>
          <p>Phone: {user.representative.phone}</p>
        </section>

        <section className='space-y-2'>
          <h3 className='text-xl font-semibold'>Focus Areas</h3>
          <p>Expertise: {user.expertise.join(', ')}</p>
          {user.otherExpertise && <p>Other Expertise: {user.otherExpertise}</p>}
          <p>Mission Statement: {user.missionStatement}</p>
          <p>Key Programs: {user.keyPrograms.join(', ')}</p>
          <p>
            Collaboration Interests: {user.collaborationInterests.join(', ')}
          </p>
          {user.fundingPrograms && (
            <p>Funding Programs: {user.fundingPrograms}</p>
          )}
        </section>

        <section className='space-y-2'>
          <h3 className='text-xl font-semibold'>Documents</h3>
          {user.orgProfile && (
            <p>
              Organization Profile:{' '}
              <a
                href={user.orgProfile.url}
                className='text-blue-600 hover:underline'
              >
                View Profile
              </a>
            </p>
          )}
          {user.reports && (
            <div>
              <p>Reports:</p>
              <ul className='list-disc pl-5'>
                {user.reports.map((doc, index) => (
                  <li key={doc.cloudinaryId}>
                    <a href={doc.url} className='text-blue-600 hover:underline'>
                      Report {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {user.brochures && (
            <div>
              <p>Brochures:</p>
              <ul className='list-disc pl-5'>
                {user.brochures.map((doc, index) => (
                  <li key={doc.cloudinaryId}>
                    <a href={doc.url} className='text-blue-600 hover:underline'>
                      Brochure {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {user.projects && (
            <div>
              <p>Projects:</p>
              <ul className='list-disc pl-5'>
                {user.projects.map((doc, index) => (
                  <li key={doc.cloudinaryId}>
                    <a href={doc.url} className='text-blue-600 hover:underline'>
                      Project {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    );
  }

  return null;
};
