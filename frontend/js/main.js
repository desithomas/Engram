// papa smurfs

const assignmentForm = document.querySelector("form")
const assignmentFiles = document.querySelector('#assignmentFiles')
const selectedFiles = document.querySelector('#selectedFiles')
const assignmentList = document.querySelector('#assignmentListHeading')
const searchAssignments = document.querySelector('#searchAssignments')

let assignments = JSON.parse(localStorage.getItem('assignments')) || []

// files that the student selects 

if (assignmentFiles && selectedFiles) {
    assignmentFiles.addEventListener('change', function (){
        selectedFiles.innerHTML = ""

        const files = Array.from (assignmentFiles.files)

        if (files.length === 0){
            const emptyMessage = document.createElement('li')
            emptyMessage.textContent = "No files have been selected."
            selectedFiles.appendChild(emptyMessage)
            return
        }

        files.forEach(function (file) { 
            const fileItem = document.createElement('li')

            fileItem.textContent = `${file.name} - ${formatFileSize(file.size)}`

            selectedFiles.appendChild(fileItem)
        })
    })
}
    // page refreshs here, stop it from refreshing

    if (assignmentForm){
        assignmentForm.addEventListener('submit', function(event) {
            event.preventDefault()

            const assignmentTitle = document.querySelector('#assignmentTitle').value
            const assignmentType= document.querySelector('#assignmentType').value
            const dueDate = document.querySelector('#dueDate').value
            const estimatedTime = document.querySelector('#estimatedTime').value 
            const energyLevel = document.querySelector('#energyLevel').value
            const assignmentStatus = document.querySelector('#assignmentStatus').value 
            const assignmentInstructions = document.querySelector('#assignmentInstructions').value
            const courseName = document.querySelector('#courseName').value

            const newAssignment = {
                id: Date.now(), 
                title: assignmentTitle, 
                type: assignmentType, 
                dueDate: dueDate, 
                estimatedTime: estimatedTime, 
                energyLevel: energyLevel, 
                courseName : courseName, 
                status: assignmentStatus, 
                instructions: assignmentInstructions
            }

            assignments.push(newAssignment)

            localStorage.setItem('assignments', JSON.stringify(assignments))

            displayAssignments()

            assignmentForm.reset()

            if(selectedFiles){
                selectedFiles.innerHTML = '<li>No files have been selected</li>'
            }

                alert("Assignment saved")
        })
    }

    //assignments on the page 

    function displayAssignments(){
        if (!assignmentList){
            return
        }

        assignmentList.innerHTML = ""

        if(assignments.length === 0){
            const emptyMessage = document.createElement("article")

            const heading = document.createElement('h3')
                heading.textContent = "No assignments yet."
            
            const message = document.createElement('p')
            message.textContent = "Add assignment to get started on organizing. "

            emptyMessage.appendChild(heading)
            emptyMessage.appendChild(message)

            assignmentList.appendChild(emptyMessage)
            return
            
        }

        assignments.forEach(function(assignment){
            const assignmentCard = document.createElement('article')

            const heading = document.createElement('h3')
            heading.textContent = assignment.title

            const course = document.createElement('p')
            course.textContent = `Course Name: ${assignment.courseName}`

            const dueDate = document.createElement('p')
            dueDate.textContent =`Due Date:  ${assignment.dueDate}`

const estimatedTime = document.createElement('p')
                estimatedTime.textContent = `Estimated time: ${assignment.estimatedTime} hours/days/minutes`

            const status = document.createElement('p')
            status.textContent = `Status: ${assignment.status}`

            const deleteButton = document.createElement('button')
            deleteButton.type = 'button'
            deleteButton.textContent = 'Delete assignment'

            deleteButton.addEventListener('click', function() {
                deleteAssignment(assignment.id)

                
            })

            assignmentCard.appendChild(heading)
            assignmentCard.appendChild(course)
            assignmentCard.appendChild(dueDate)
            assignmentCard.appendChild(estimatedTime)
            assignmentCard.appendChild(status)
            assignmentCard.appendChild(deleteButton)
            assignmentList.appendChild(assignmentCard)
        })
    }

    //delete assignment from array and localStorage since Mongo is not set up yet

    function deleteAssignment(assignmentId){
        assignments = assignments.filter(function (assignment){
            return assignment.id !== assignmentId
        })

        localStorage.setItem('assignments', JSON.stringify(assignments))

        displayAssignments()
    }

    // search through assignments 

     if (searchAssignments){
        searchAssignments.addEventListener('input', function (){
            const searchText = searchAssignments.value.toLowerCase()

            const matchingAssignments = assignments.filter(function(assignment){
                const titleMatches = assignment.title.toLowerCase().includes(searchText)

                const courseMatches = assignment.courseName.toLowerCase().includes(searchText)

                return titleMatches || courseMatches
            })

            displayFilteredAssignments(matchingAssignments)
        })
     }

     function displayFilteredAssignments (filteredAssignments){
        if (!assignmentList){
            return
        }

        assignmentList.innerHTML = ""

        if (filteredAssignments.length === 0){
            const emptyMessage = document.createElement('article')

            const heading = document.createElement('h3')
            heading.textContent = 'No matching assignments'

            const message = document.createElement('p')
            message.textContent = "Please try a different name or search term."

            emptyMessage.appendChild(heading)
            emptyMessage.appendChild(message)

            assignmentList.appendChild(emptyMessage)
            return
        }

        filteredAssignments.forEach(function(assignment){
            const assignmentCard = document.createElement('article')

            const heading = document.createElement('h3')
            heading.textContent = assignment.title

            const course = document.createElement('p')
            course.textContent = `Course: ${assignment.courseName}`

        const dueDate = document.createElement('p')
        dueDate.textContent = `Due Date: ${assignment.dueDate}`

           const status = document.createElement('p')
           status.textContent = `Status: ${assignment.dueDate}` 

        assignmentCard.appendChild(heading)
        assignmentCard.appendChild(course)
        assignmentCard.appendChild(dueDate)
        assignmentCard.appendChild(status)
        assignmentList.appendChild(assignmentCard)
        })
     }

     //files have sizes that you need to worry about 

     function formatFileSize(fileSize){
        const sizeInKB = fileSize / 1024

        if (sizeInKB < 1024){
            return `${sizeInKB.toFixed(1)} KB`
        }

        const sizeInMB = sizeInKB / 1024

        return `${sizeInMB.toFixed(1)} MB`
     }

    //  Show the saved assignments when the page is loaded

    displayAssignments()