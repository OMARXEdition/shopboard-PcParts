import { photoCredits } from './photo-credits'
export function PhotoCredits() {
  return (
    <details className="photo-credits container">
      <summary>Photo credits & licenses</summary>
      <p>
        Real category photographs from Wikimedia Commons. Images are
        representative; fictional product names, sample capacities,
        specifications and prices do not describe the exact photographed models.
      </p>
      <ul>
        {photoCredits.map((photo) => (
          <li key={photo.file}>
            <a href={photo.source} target="_blank" rel="noreferrer">
              {photo.title.replace('File:', '')}
            </a>{' '}
            — {photo.author} ·{' '}
            <a href={photo.licenseUrl} target="_blank" rel="noreferrer">
              {photo.license}
            </a>
            . {photo.changes}
          </li>
        ))}
      </ul>
      <p>
        Original pixel logo and background decoration created for this project.
      </p>
    </details>
  )
}
